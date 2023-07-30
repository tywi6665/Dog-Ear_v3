from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.upload.models import File
from apps.upload.services import (
    FileDirectUploadService
)
import requests
# from apps.upload.authMixin import ApiAuthMixin

# class ImageViewset(viewsets.ModelViewSet):
#     queryset = Image.objects.all()
#     serializer_class = ImageSerializer
#     parser_classes = [parsers.MultiPartParser, parsers.FormParser]
#     http_method_names = ['get', 'post', 'delete']

class FileDirectUploadStartApi(APIView):
    class InputSerializer(serializers.Serializer):
        file_name = serializers.CharField()
        file_type = serializers.CharField()

    def post(self, request, *args, **kwargs):
        print('------Start-------', request)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.uploaded_by = request.user.id
        service = FileDirectUploadService(request.user)
        presigned_data = service.start(**serializer.validated_data)

        #Upload file to S3 using presigned URL

        print("-----Data-----", presigned_data)
        files = { 'file': open(presigned_data['fields']["key"], 'rb')}
        r = requests.post(presigned_data['url'], data=presigned_data['fields'], files=files)
        print(r.status_code)

        # return Response(data=presigned_data)


class FileDirectUploadFinishApi(APIView):
    class InputSerializer(serializers.Serializer):
        file_id = serializers.CharField()

    def post(self, request):
        print("-----Finish-----", request)
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.uploaded_by = request.user.id
        file_id = serializer.validated_data["file_id"]

        file = get_object_or_404(File, id=file_id)

        service = FileDirectUploadService(request.user)
        service.finish(file=file)

        return Response({"id": file.id})


class FileDirectUploadLocalApi(APIView):
    def post(self, request, file_id):
        file = get_object_or_404(File, id=file_id)
        print('------file_obj-------', request.FILES)
        file_obj = request.POST["file"]

        service = FileDirectUploadService(request.user)
        file = service.upload_local(file=file, file_obj=file_obj)

        return Response({"id": file.id})