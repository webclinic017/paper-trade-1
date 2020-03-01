from django.utils import timezone
from rest_framework_simplejwt import authentication

class CustomViewMiddleWare:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # downside here is user is authenticated twice
        try:
            request.user = authentication.JWTAuthentication().authenticate(request)[0]
            request.user.last_connected = timezone.now()
            request.user.save()
        except Exception as ex:
            print(ex)

        response = self.get_response(request)
        return response
