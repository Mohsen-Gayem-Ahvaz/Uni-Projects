from flask import Flask, render_template

service = Flask(import_name=__name__, template_folder="templates", static_folder="static")

@service.route("/")
@service.route("/home")
def root():
    return render_template("index.html")


if __name__ == '__main__':
    service.run(
        host="0.0.0.0", port=5050
    )
