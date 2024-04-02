import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import API_BASE from '../hooks/apiUrl';
const Homepage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(API_BASE + "/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
                console.log("categories: ", categories)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(API_BASE + `/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    //get Total 
    const getTotal = async () => {
        try {
            const { data } = await axios.get(API_BASE + '/api/v1/product/product-count')
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page == 1) return;
        loadMore()
    }, [page])
    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(API_BASE + `/api/v1/product/product-list/${page}`);
            setProducts([...products, ...data?.products])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    // filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked, radio])


    // get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(API_BASE + '/api/v1/product/product-filters', { checked, radio });
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="row mt-3 ml-3">
                <div className="col-md-2">
                    <h4 className='text-center'>Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* Price Filter  */}
                    <h4 className='text-center mt-4'>Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products && !products.length && (<p>No Products Available</p>)}
                        {products?.map(p => (
                            <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text"> ₹ {p.price}</p>
                                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            toast.success('Item added to cart');
                                        }}>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);

                                }}>{loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Homepage