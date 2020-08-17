from django.utils.functional import wraps


from django.shortcuts import redirect

from django.shortcuts import render

from accounts.models import CVFile, Position
                      

def check_cvfile(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        #print('hello')
        if CVFile.objects.filter(user_id=request.user.id).count() > 0:
        
            return function(request, *args, **kwargs)
        else:
            #print('no')
            #return render(request, 'student/access_denied.html')
            return redirect('%s?next=%s' % ('/add_cvfile/', request.path))
        '''
        entry = Entry.objects.get(pk=kwargs['entry_id'])
        if entry.created_by == request.user:
            return function(request, *args, **kwargs)
        else:
            raise PermissionDenied
        '''
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
    
def check_position(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        #print('hello')
        if Position.objects.filter(user_id=request.user.id).count() > 0:
        
            return function(request, *args, **kwargs)
        else:
            print('no')
            #return render(request, 'student/access_denied.html')
            return redirect('%s?next=%s' % ('/add_position/', request.path))
        '''
        entry = Entry.objects.get(pk=kwargs['entry_id'])
        if entry.created_by == request.user:
            return function(request, *args, **kwargs)
        else:
            raise PermissionDenied
        '''
    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap    