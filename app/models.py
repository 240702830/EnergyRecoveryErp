"""
Definition of models.
"""

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# 产品类型表
class ProductType(models.Model):
    type_name = models.CharField(max_length=15)


    
# 产品表
class Product(models.Model):
    name = models.CharField(max_length = 30)
    product_type = models.ForeignKey(ProductType,on_delete = models.DO_NOTHING)
    depict = models.TextField()
    creator = models.ForeignKey(User)
    created_time = models.DateTimeField(auto_now_add = True)
    last_updated_time = models.DateTimeField(auto_now = True)
