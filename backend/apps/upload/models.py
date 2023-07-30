from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

def file_generate_upload_path(instance, filename):
	# Both filename and instance.file_name should have the same values
    return f"files/{instance.file_name}"

class File(models.Model):
    file = models.FileField(upload_to=file_generate_upload_path, blank=True, null=True)
    original_file_name = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255, unique=True)
    file_type = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_finished_at = models.DateTimeField(blank=True, null=True)
    
    @property
    def is_valid(self):
        """
        We consider a file "valid" if the the datetime flag has value.
        """
        return bool(self.upload_finished_at)

    @property
    def url(self):
        if settings.FILE_UPLOAD_STORAGE == "s3":
            return self.file.url

        return f"{settings.APP_DOMAIN}{self.file.url}"