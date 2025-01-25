from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    search_fields = ('name', 'price')
    list_filter = ('name', 'price')
    ordering = ('name', 'price')
    list_per_page = 10