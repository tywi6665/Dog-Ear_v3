from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from apps.accounts.urls import accounts_urlpatterns
from apps.recipes.urls import recipes_urlpatterns
from apps.scraper.urls import scraper_urlpatterns
# from apps.upload.urls import upload_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_urlpatterns
urlpatterns += recipes_urlpatterns
urlpatterns += scraper_urlpatterns
# urlpatterns += upload_urlpatterns

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)