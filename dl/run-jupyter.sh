open http://127.0.0.1:8888

docker run -it -p 8888:8888 -p 6006:6006 floydhub/dl-docker:cpu jupyter notebook
