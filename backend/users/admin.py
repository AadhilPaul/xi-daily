from django.contrib import admin
from .models import AnonymousUser, Guess, UserResult

# Register your models here.
admin.site.register(AnonymousUser)
admin.site.register(Guess)
admin.site.register(UserResult)

