# Generated by Django 4.1.7 on 2023-07-23 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0005_delete_scrapedrecipeitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipeitem',
            name='ingredients',
            field=models.TextField(blank=True, default='[{"header":"","content":[]}]'),
        ),
        migrations.AlterField(
            model_name='recipeitem',
            name='steps',
            field=models.TextField(blank=True, default='[{"header":"","content":[]}]'),
        ),
    ]