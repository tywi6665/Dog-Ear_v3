# Generated by Django 4.1.7 on 2023-03-10 23:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ScrapedRecipeItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_id', models.UUIDField(default='', unique=True)),
                ('url', models.URLField(blank=True, default='', max_length=300)),
                ('title', models.CharField(default='', max_length=100)),
                ('author', models.CharField(blank=True, default='', max_length=100)),
                ('description', models.TextField(blank=True, default='')),
                ('img_src', models.URLField(blank=True, default='', max_length=300)),
                ('has_made', models.BooleanField(default=False)),
                ('notes', models.JSONField(default=list)),
                ('rating', models.IntegerField(default=0)),
                ('tags', models.JSONField(default=list)),
                ('ingredients', models.TextField(blank=True, default='')),
                ('steps', models.TextField(blank=True, default='')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
