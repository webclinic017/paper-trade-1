from paper_robin.celery import app
from paper_robin.apps.stock.models import Stock


import random
import string


def randomString(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


@app.task
def hello():
    Stock.objects.create(name=randomString(), symbol=randomString())
    

