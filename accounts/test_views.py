
import unittest
from django.test import Client

class LoginTest(unittest.TestCase):

    def setUp(self):
        # Every test needs a client
        self.client = Client()

    def test_login(self):

        payload = {
            'email': 'admin.gmail.com',
            'password': 'admin'
        }

        response = self.client.get('/users/login/')


        # check that the response is 200 OK.
        #self.assertEqual(response.status_code, 200)

        response = self.client.post('/users/login/', payload)
        print(response.status_code)
        self.assertEqual(response.status_code, 200)




