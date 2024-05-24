from flask import Flask, render_template, redirect, Response

service = Flask(import_name=__name__, template_folder="templates", static_folder="static")


@service.route("/", methods=["GET"])
def root_controller():
    return render_template("index.html")


@service.route(rule="/home", methods=["GET"])
def home_controller():
    return redirect("/")


@service.route("/laptops", methods=["GET"])
def laptop_controller():
    resp = Response(response=render_template("laptop.html"))
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


if __name__ == '__main__':
    service.run(
        host="0.0.0.0", port=5050, debug=True
    )
