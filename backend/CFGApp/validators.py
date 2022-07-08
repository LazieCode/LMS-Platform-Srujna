from django.core.exceptions import ValidationError

def validate_phone_length(value):
    if len(str(value)) != 10:
        raise ValidationError("Invalid Phone number entered")