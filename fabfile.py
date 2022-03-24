from fabric import task
from invoke import run as local
from patchwork.transfers import rsync

remote_path = "/home/natebeaty/apps/al6"
remote_hosts = ["natebeaty@natebeaty.opalstacked.com"]
php_command = "php74"

# set to production
# @task
# def production(c):
#     global remote_hosts, remote_path
#     remote_hosts = ["natebeaty@natebeaty.com"]
#     remote_path = "/home/natebeaty/apps/nb-craft3-production"

# deploy
@task(hosts=remote_hosts)
def deploy(c):
    update(c)
    composer_update(c)
    clear_cache(c)

def update(c):
    c.run("cd {} && git pull".format(remote_path))

def composer_update(c):
    c.run("cd {} && {} ~/bin/composer.phar install".format(remote_path, php_command))

def clear_cache(c):
    c.run("cd {} && ./craft clear-caches/compiled-templates".format(remote_path))
    c.run("cd {} && ./craft clear-caches/data".format(remote_path))

# local commands
@task(hosts=remote_hosts)
def syncuploads(c):
    rsync(c, "web/uploads/", "{}/web/uploads/".format(remote_path))

# @task
# def dev(c):
#     local("gulp watch")
