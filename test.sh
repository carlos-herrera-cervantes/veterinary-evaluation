env=".env.test"

if [ -e "$1" ]
then
    env=$1
fi

export $(cat $env | grep -v ^# | xargs)
npm run test
