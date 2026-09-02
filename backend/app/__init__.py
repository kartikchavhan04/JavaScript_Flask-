from pathlib import Path

from flask import Flask, send_from_directory
from flask_cors import CORS

from config import Config
from extensions import db


def create_app():

    frontend_path = Path(__file__).resolve().parents[2] / "frontend"
    app = Flask(
        __name__,
        static_folder=str(frontend_path),
        static_url_path=""
    )

    @app.route("/")
    def index():
        return send_from_directory(frontend_path, "employee.html")

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