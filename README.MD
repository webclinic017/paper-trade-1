# Paper Robin

Paper trading app with similar UI as robinhood.

### Prerequisites

* Python >= 3.6
* pip
* virtualenv -- recommended
* Node
* Docker

### Installing

    $ git clone https://github.com/long74100/Paper-Robin.git
    $ cd backend
    $ virtualenv project-env
    $ source project-env/bin/activate
    $ pip install -r requirements.txt
    $ python manage.py makemigrations
    $ python manage.py migrate
    $ python manage.py runserver
    
    $ cd portal  
    $ npm install
    $ npm start

    or 

    $ docker-compose up --build

## Built With

* Django
* TypeScript/React/Redux
