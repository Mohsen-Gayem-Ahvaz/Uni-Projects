from flask import Flask, render_template

# App Init
service = Flask(import_name=__name__, template_folder="templates", static_folder="static")

@service.route("/")
def root():
    return render_template("index.html")


