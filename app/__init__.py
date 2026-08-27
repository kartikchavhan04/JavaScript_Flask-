from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)

    from app.controllers.employee_controller import employee_bp
    from app.controllers.student_controller import student_bp

    app.register_blueprint(employee_bp)
    app.register_blueprint(student_bp)

    with app.app_context():
        db.create_all()

    return app