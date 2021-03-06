"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 3.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'oia4q7wqjrepcve^#c8qc5xzka(y^z5v@w$u54iquv(bm4e-*0'

# SECURITY WARNING: don't run with debug turned on in production!
#DEBUG = False

# development
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','192.168.0.150', 'localhost']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'rest_framework',
    'corsheaders',
    'thjobsdb',
    'thjobsthai',
    'thjobsbkk',
    'thjobstopgun',
    'thmonstercoth',
    'thaijobcom',
    'thjobyescoth',
    'thjobthaiwebcom',
    'accounts',
    
    'django_rest_passwordreset'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',

]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test',
        'USER': 'test',
        'PASSWORD': 'test',
        'HOST': 'localhost',
        'PORT': '',
        },
    'sqlite': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'scrapy.db'),
        #'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

#STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'static'),
)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

#CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = (
       'http://192.168.0.150:3000',              
)


AUTH_USER_MODEL = 'accounts.CustomUser'

#Handle session is not Json Serializable
#SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'
# Gmail settings

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'hello@gmail.com'
EMAIL_HOST_PASSWORD = 'hello'
EMAIL_PORT = 587
EMAIL_USE_TLS = True


# pagination per page
PER_PAGE = 100

SITE_ID = 1


#CELERY_BROKER_URL = 'redis://h:p35dfc08bb5d2a659e408bc61dec2d58d0ed77ae61b5cd60e30d48b43e7ff7944@ec2-3-222-186-102.compute-1.amazonaws.com:11459'
#CELERY_BROKER_URL = 'amqp://localhost'

CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'


CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True 

CORS_ALLOW_HEADERS = (
       'access-control-allow-credentials',
       'access-control-allow-origin',
       'access-control-request-method',
       'access-control-request-headers',
       'accept',
       'accept-encoding',
       'accept-language',
       'authorization',
       'connection',
       'content-type',
       'dnt',
       'credentials',
       'host',
       'origin',
       'user-agent',
       'X-CSRF-TOKEN',
       'X-CSRFToken',
       'x-requested-with',
)

from datetime import timedelta


REST_FRAMEWORK = {
    #'DEFAULT_PERMISSION_CLASSES': (
    #    'rest_framework.permissions.IsAuthenticated',
   # ),
    #'EXCEPTION_HANDLER': 'accounts.core.exceptions.core_exception_handler',
    'NON_FIELD_ERRORS_KEY': 'error',
   
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),  # 
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('JWT',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

MIN_PASSWORD_LENGTH = 5

# production for front end 
if DEBUG:
    FRONT_END_URL = "192.168.0.150:3000"    
else:
    FRONT_END_URL = "apply.nyeinpe.xyz"
    

