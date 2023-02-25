from django.contrib import admin
from django.urls import path
from apps.accounts.urls import accounts_urlpatterns
from apps.recipes.urls import recipes_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_urlpatterns
urlpatterns += recipes_urlpatterns