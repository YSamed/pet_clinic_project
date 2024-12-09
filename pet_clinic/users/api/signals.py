from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomUser
from clinic.models import Owner

@receiver(post_save, sender=CustomUser)
def create_owner(sender, instance, created, **kwargs):
    if created:  # Eğer yeni bir CustomUser oluşturulduysa
        Owner.objects.create(user=instance)
