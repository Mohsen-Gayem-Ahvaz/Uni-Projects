from flask import Flask, render_template, redirect

service = Flask(import_name=__name__, template_folder="templates", static_folder="static")


@service.route("/")
def root_controller():
    return render_template("index.html")


@service.route(rule="/home")
def home_controller():
    return redirect("/")


@service.route("/laptops")
def laptop_controller():
    return render_template("laptop.html")


@service.route("/login")
def login_controller():
    return "Login View"


if __name__ == '__main__':
    service.run(
        host="0.0.0.0", port=5050, debug=True
    )
