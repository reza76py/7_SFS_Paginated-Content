from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from .models import Product
from .serializer import ProductSerializer


class ProductPagination(PageNumberPagination):
    page_size = 5


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
