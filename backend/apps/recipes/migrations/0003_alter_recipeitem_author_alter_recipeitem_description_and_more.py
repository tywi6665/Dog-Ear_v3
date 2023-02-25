# Generated by Django 4.1.7 on 2023-02-22 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipeitem_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipeitem',
            name='author',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='img_src',
            field=models.URLField(blank=True, default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='ingredients',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='steps',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='url',
            field=models.URLField(blank=True, default='', max_length=300),
        ),
    ]
