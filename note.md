<>
      <Link
        to={PATH_ADMIN_PRODUCT_ADD}
        className="px-2 py-1 rounded bg-[#f16331] text-white hover:text-white"
      >
        Add Product
      </Link>
      <List
        className="mt-4"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3
        }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Image height={150} preview={true} src={item.thumbnail} />
            <Card>
              <Row>
                <Col span={12}>
                  <Link
                    to={PATH_ADMIN_PRODUCT + `/${item.id}`}
                    className="hover:text-[#f16331]"
                  >
                    {item.name}
                  </Link>
                </Col>
                <Col span={12} className="text-right">
                  {item.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND"
                  })}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={24} className="text-right">
                  {item.isStock ? (
                    <span className="bg-green-600 text-white px-2 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-orange-600 text-white px-2 rounded">
                      Out of Stock
                    </span>
                  )}
                </Col>
              </Row>
              <Row className="mt-3 h-16 overflow-hidden text-ellipsis ">
                <Col>{item.decription}</Col>
              </Row>
              <Row className="mt-3">
                <Col span={12}>
                  <Popconfirm
                    placement="bottomLeft"
                    title={`Are you sure to delete ${item.name}?`}
                    onConfirm={() => confirm(`${item.id}`)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link
                      to=""
                      className="px-2 py-1 rounded bg-[#f16331] text-white hover:bg-red-600 hover:text-white"
                    >
                      Remove
                    </Link>
                  </Popconfirm>
                </Col>
                <Col span={12} className="text-right">
                  <Link
                    to={PATH_ADMIN_PRODUCT + `/edit/${item.id}`}
                    className="px-2 py-1 rounded bg-black text-white hover:text-white"
                  >
                    Edit
                  </Link>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </>

    <Row className="justify-between items-center my-3">
                <Col className="border-r-2 border-r-gray-200 w-1/2 flex justify-center">
                  <div className="text-center">
                    <GatewayOutlined className="text-5xl mb-2 text-[#f16331]" />
                    <p className="text-l font-semibold">1001</p>
                    <p className="text-l">Buyed</p>
                  </div>
                </Col>
                <Col className="border-r-2 border-r-gray-200 w-1/2 flex justify-center">
                  <div className="text-center">
                    <HeartOutlined className="text-5xl mb-2 text-[#f16331]" />
                    <p className="text-l font-semibold">101</p>
                    <p className="text-l">Like</p>
                  </div>
                </Col>
              </Row>