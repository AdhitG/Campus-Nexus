urls.py
 from django.contrib import admin
 from django.urls import path, include
 from users.views import *
 from clubadmins.views import *
 from events.views import *
 urlpatterns = [
 path('admin/', admin.site.urls),
 path('api/v1/', include('djoser.urls')),
 path('api/v1/', include('djoser.urls.authtoken')),
 path('api/v1/userhome/', Clubslist.as_view(), name = "usershome"),
 path('api/v1/userhome/login', StudentLogin.as_view(), name="StudentLogin"),
 path('api/v1/adminhome/register', ClubAdminsRegister.as_view(),
 name="Clubadminregister"),
 path('api/v1/userhome/events/', Eventslist.as_view(), name = "eventslist"),
 path('api/v1/userhome/<str:clubid>/events', Clubevents.as_view(), name="clubevents"),
 path('api/v1/userhome/<str:clubid>/events/<str:eventid>', Eventsdetails.as_view(),
 name="clubevents"),
 path('api/v1/userhome/<str:clubid>/about', Clubinfo.as_view(), name="clubinfo"),
 path('api/v1/userhome/<str:clubid>/events/<str:eventid>/register',
 StRegValidation.as_view(), name="StRegValidation"),
 path('api/v1/userhome/<str:strollno>/myregistrations', Stregistrations.as_view(),
 name="Stregistrations"),
 path('api/v1/userhome/register', StudentRegistration.as_view(),
 name="StudentRegistration"),
 path('api/v1/adminhome/login', ClubAdminLogin.as_view(), name="Clubadminlogin"),
 path('api/v1/adminhome/<str:clubid>', Clubinfo.as_view(), name="Adminhome"),
 path('api/v1/adminhome/<str:clubid>/events/<str:eventid>/sendremainder',EmailRemainder.as_v
 iew(),name="Eventemailremainder"),
 path('api/v1/adminhome/<str:clubid>/events/<str:eventid>/downloadparticipantslist',
 DownloadParticipantsList.as_view(),name="EventParticipantslist"),
 path('api/v1/adminhome/<str:clubid>/events', Clubevents.as_view(),
 name="Adminclubevents"),
 path('api/v1/adminhome/<str:clubid>/registerevent',AdminEventRegistration.as_view(),name="A
 dmineventregistration"),
 path('api/v1/adminhome/<str:clubid>/editevent/<str:eventid>',AdminEditEvent.as_view(),name=
 "Admineditevent"),]