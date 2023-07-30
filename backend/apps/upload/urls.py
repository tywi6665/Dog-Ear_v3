from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.upload.views import FileDirectUploadStartApi, FileDirectUploadFinishApi, FileDirectUploadLocalApi

router = DefaultRouter()
# upload_urlpatterns = [
#     path('api/v1/upload/direct/start', FileDirectUploadStartApi.as_view(), name="start"),
#     path("api/v1/upload/direct/finish", FileDirectUploadFinishApi.as_view(), name="finish"),
# ]

upload_urlpatterns = [
    path(
        "api/v1/upload/",
        include(
            (
                [
                    # path("standard/", FileStandardUploadApi.as_view(), name="standard"),
                    path(
                        "direct/",
                        include(
                            (
                                [
                                    path("start/", FileDirectUploadStartApi.as_view(), name="start"),
                                    path("finish/", FileDirectUploadFinishApi.as_view(), name="finish"),
                                    path("local/<str:file_id>/", FileDirectUploadLocalApi.as_view(), name="local"),
                                ],
                                "direct",
                            )
                        ),
                    ),
                ],
                "upload",
            )
        ),
    )
]