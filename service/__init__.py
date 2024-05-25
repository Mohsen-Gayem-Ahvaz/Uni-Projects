from flask import Flask, render_template, redirect, Response

service = Flask(import_name=__name__, template_folder="templates", static_folder="static")


@service.route("/", methods=["GET"])
def root_controller():
    return render_template("index.html")


if __name__ == '__main__':
    service.run(
        host="0.0.0.0", port=5050, debug=True
    )
