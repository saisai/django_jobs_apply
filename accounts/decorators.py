from django.utils.functional import wraps


from django.shortcuts import redirect

from django.shortcuts import render

from accounts.models import CVFile, Position
                      

def check_cvfile(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        
        if CVFile.objects.filter(user_id=request.user.id).count() > 0:
        
            return function(request, *args, **kwargs)
        else:
           
            return redirect('%s?next=%s' % ('/add_cvfile/', request.path))
        
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
    
def check_position(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        
        if Position.objects.filter(user_id=request.user.id).count() > 0:
        
            return function(request, *args, **kwargs)
        else:
            
            
            return redirect('%s?next=%s' % ('/add_position/', request.path))
       
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap    