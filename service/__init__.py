from flask import Flask, render_template
import config

service = Flask(import_name=__name__, template_folder="templates", static_folder="static")
service.config.from_object(config.DevelopmentConfig)


@service.route("/")
def root():
    return render_template("index.html")

