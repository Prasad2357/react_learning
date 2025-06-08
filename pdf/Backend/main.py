from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from api.users import routes as user_route
# from api.OAuth import routes as oauth_route
# from api.Todo import routes as Todo_route
# from api.Google_Auth import routes as Google_route
import routes as PDF_route
# from repository.users.repository import UserRepository

from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()



app.add_middleware(
    SessionMiddleware,
    secret_key="aaf2f04da2fcb5cf2af752d8121c79d843fbb8c9800de720ab1c3905d140ad4d",
    same_site='None',
    https_only = True
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allow only your frontend
    allow_credentials=True,
    allow_methods=["*"],    # allow all HTTP methods (POST, GET, etc)
    allow_headers=["*"],    # allow all headers
)

# app.include_router(user_route.router)
# app.include_router(oauth_route.router)
# app.include_router(Todo_route.router)
# app.include_router(Google_route.router)
app.include_router(PDF_route.router)


# @app.on_event("startup")
# def on_startup():
#     UserRepository.create_username_index()


@app.get("/")
def root():
    return {"message": "CouchDB FastAPI Service Running!"}

