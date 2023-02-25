from rest_framework import viewsets 
from apps.recipes.models import RecipeItem 
from apps.recipes.serializers import RecipeItemSerializer

class RecipeItemViewSet(viewsets.ModelViewSet):

    serializer_class = RecipeItemSerializer
    queryset = RecipeItem.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(created_by=self.request.user)
