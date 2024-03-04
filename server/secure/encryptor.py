from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7
from cryptography.hazmat.primitives.asymmetric import padding
import secrets
import base64



def __getKeyFromString(key_string:str):
    key_hash = hashes.Hash(hashes.SHA256(), backend=default_backend())
    key_hash.update(key_string.encode('utf-8'))
    hashed_key = key_hash.finalize()
    return hashed_key[:32]


def encryptString(key:str,data:str,method:str):
    key = __getKeyFromString(key_string=key)
    iv = secrets.token_bytes(16)

  
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor() 

    padder = PKCS7(128).padder()
    padded_data = padder.update(data.encode('utf-8')) + padder.finalize()

    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    final_hashed = iv + ciphertext
    
    return base64.urlsafe_b64encode(final_hashed).decode('utf-8').replace("=",f'method={method}')


