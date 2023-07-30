from django.conf import settings
from django.db import transaction
from django.utils import timezone
from apps.upload.models import File
from apps.upload.utils import (
    file_generate_local_upload_url,
    file_generate_name,
    file_generate_upload_path,
)
from apps.upload.client import s3_generate_presigned_post
import mimetypes

class FileDirectUploadService:
    def __init__(self, user):
        self.user = user

    @transaction.atomic
    def start(self, *, file_name: str, file_type: str):
        file = File(
            original_file_name=file_name,
            file_name=file_generate_name(file_name),
            file_type=file_type,
            file=None,
            uploaded_by=self.user
        )
        file.full_clean()
        file.save()

        upload_path = file_generate_upload_path(file, file.file_name)
        print("-----upload_path-----", upload_path)
        """
        We are doing this in order to have an associated file for the field.
        """
        file.file = file.file.field.attr_class(file, file.file.field, upload_path)
        file.save()

        presigned_data = {}

        if settings.FILE_UPLOAD_STORAGE == "s3":
            presigned_data = s3_generate_presigned_post(
                file_path=upload_path, file_type=file.file_type
            )
        else:
            presigned_data = {
                "url": file_generate_local_upload_url(file_id=str(file.id)),
            }

        return {"id": file.id, **presigned_data}

    @transaction.atomic
    def finish(self, *, file: File) -> File:
        file.upload_finished_at = timezone.now()
        file.full_clean()
        file.save()

        return file

    @transaction.atomic
    def upload_local(self, *, file: File, file_obj) -> File:
        file.file = file_obj
        file.full_clean()
        file.save()

        return file
    
class FileStandardUploadService:
    """
    This also serves as an example of a service class,
    which encapsulates 2 different behaviors (create & update) under a namespace.

    Meaning, we use the class here for:

    1. The namespace
    2. The ability to reuse `_infer_file_name_and_type` (which can also be an util)
    """
    def __init__(self, file_obj, uploaded_by):
        self.file_obj = file_obj
        self.uploaded_by = uploaded_by

    def _infer_file_name_and_type(self, file_name: str = "", file_type: str = ""):
        if not file_name:
            file_name = self.file_obj.name

        if not file_type:
            guessed_file_type, encoding = mimetypes.guess_type(file_name)

            if guessed_file_type is None:
                file_type = ""
            else:
                file_type = guessed_file_type

        return file_name, file_type

    @transaction.atomic
    def create(self, file_name: str = "", file_type: str = "") -> File:
        file_name, file_type = self._infer_file_name_and_type(file_name, file_type)
        print('------User-------', self.user)

        obj = File(
            file=self.file_obj,
            original_file_name=file_name,
            file_name=file_generate_name(file_name),
            file_type=file_type,
            upload_finished_at=timezone.now(),
            uploaded_by=self.user
        )

        obj.full_clean()
        obj.save()

        return obj

    @transaction.atomic
    def update(self, file: File, file_name: str = "", file_type: str = "") -> File:
        file_name, file_type = self._infer_file_name_and_type(file_name, file_type)

        file.file = self.file_obj
        file.original_file_name = file_name
        file.file_name = file_generate_name(file_name)
        file.file_type = file_type
        file.upload_finished_at = timezone.now()

        file.full_clean()
        file.save()

        return file