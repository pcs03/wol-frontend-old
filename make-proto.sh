protoc \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_out="./src/generated" \
    src/proto/data.proto

cp ./src/proto/data.proto /work/code/wolBackend/proto/data.proto