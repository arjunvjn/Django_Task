from .models import Books,MyUser
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializer import LibSerializer,AdminReg
from .adminperm import AdminPermission
from django.contrib.auth.models import auth
from rest_framework.response import Response

# Create your views here.

class LibView(viewsets.ModelViewSet):
    permission_classes = (AdminPermission,)
    serializer_class = LibSerializer
    queryset = Books.objects.all()

class AdminReg(APIView):
    def post(self,request):
        try:
            user = MyUser.objects.create(first_name=request.data['first_name'],last_name=request.data['last_name'],email=request.data['email'],username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            return Response({'msg':'Admin Created'})
        except:
            return Response({'msg':'Error'})
        


class AdminLogin(APIView):
    def post(self,request):
        try:
            user=MyUser.objects.get(email=request.data['email'])
            user = auth.authenticate(email=request.data['email'],password=request.data['password'])

            if user:
                request.session['user']=request.data['email']
                return Response({'msg':'Admin Logged In'})
            else:
                return Response({'msg':'Invalid Credentials'})
        except:
            return Response()

class AdminLogout(APIView):
    def post(self,request):
        print(request.session['user'])
        if request.session.has_key('user'):
            del request.session['user']
            return Response({'msg':'Admin Logged Out'})
        else:
            return Response({'error':request.session.has_key('user')})
