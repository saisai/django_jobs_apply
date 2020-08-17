
param=$2

function editCommit
{
    git -c user.name="saisai" -c user.email="saisai@gmail.com" commit -am "$param"
}

function addCommit
{
    git -c user.name="saisai" -c user.email="saisai@gmail.com" commit -m "$param"
}


function PULL
{
    git -c user.name="saisai" -c user.email="saisai@gmail.com" pull 
}

function PUSH
{
    git -c user.name="saisai" -c user.email="saisai@gmail.com" push 
}


case "$1" in
    (PUSH)
        PUSH
        exit 3
        ;;
    (addCommit)
        addCommit
        exit 2
        ;;
    (editCommit)
        editCommit
        exit 1
        ;;
    (PULL)
        PULL
        exit 0
        ;;
    (*)
        echo "Usage :$) { addCommit | editCommit | PULL | PUSH }"
        exit 2
        ;;
esac

exit $?

# http://unix.stackexchange.com/questions/137969/bash-function-execution-from-command-line
# http://wiki.linuxquestions.org/wiki/Creating_startup_scripts
#if [ $# -ne 1 ]; then
#    echo " "
#    echo $0: usage: $0 param
#    exit 1
#fi
