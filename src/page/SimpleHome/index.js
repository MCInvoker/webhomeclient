import { useEffect, useState } from "react";
import './index.css'
// import { mockLinkAll } from './mock'
import AddLink from "./addLink";
import AddCategory from "./addCategory";
import HoverEditDelete from "../../compenonts/HoverEditDelete";
import { addLink, deleteLink } from '../../api/link'
import { addCategory, deleteCategory } from "../../api/category";
import { getPage } from "../../api/page";

const SimpleHome = () => {
    const params = new URLSearchParams(window.location.search);
    const page_id = params.get('page_id');

    // const [linkAll, setLinkAll] = useState(mockLinkAll)
    const [page, setPage] = useState()
    // const [categories, setCategories] = useState([])
    const [category_id, setCategory_id] = useState('')
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);

    const handleLink = (url) => {
        window.open(url, '_blank');
    }

    const handleAddLink = (category_id) => {
        setCategory_id(category_id)
        setAddLinkOpen(true)
        console.log(123)
    }

    const handleAddCategory = (category_id) => {
        setAddCategoryOpen(true)
    }

    const handleCreateLink = async (values) => {
        // 处理新增数据的逻辑
        const res = await addLink({ ...values, category_id })
    };
    
    const handleCreateCategory = async (values) => {
        const res = await addCategory({  ...values }, page_id)
    };

    const handleDeleteLink = async (link_id) => {
        // 处理新增数据的逻辑
        const res = await deleteLink(link_id)
        console.log(res)
    };

    const handleDeleteCategory = async (category_id) => {
        // 处理新增数据的逻辑
        const res = await deleteLink(category_id)
        console.log(res)
    };


    useEffect(() => {
        async function fetchData () {
            if (!page_id) return
            const res = await getPage(page_id);
            setPage(res.data)
            console.log(res)
            // setCategories(res.data.categories)
        }
        fetchData();
    }, [page_id]);

    const handleCancel = () => {
        setAddLinkOpen(false);
    };
    return <div className='simpleHome'>
        {
            page && page.categories && page.categories.map((category) => {
                return (
                    <div key={category.category_id} className='category'>
                        <HoverEditDelete
                            handleDelete={() => handleDeleteCategory(category.category_id)}
                            handleEdit={() => console.log('handleEdit')}
                            top={-46}
                            right={-16}
                        >
                            <div className='categoryName'>{category.category_name}</div>
                        </HoverEditDelete>
                        <div className='links'>
                            {
                                category.links.map((link) => {
                                    return (
                                        <div key={link.link_id}>
                                            <HoverEditDelete
                                                handleDelete={() => handleDeleteLink(link.link_id)}
                                                handleEdit={() => console.log('handleEdit')}
                                                top={-16}
                                                right={-16}
                                            >
                                                <div className='linkBox' onClick={() => handleLink(link.url)}>
                                                    {
                                                        link.icon && (
                                                            <img className='linkImg' src={link.icon} alt={link.title || ''}></img>
                                                            // <img className='linkImg' src="logo192.png" alt={link.title || ''}></img>
                                                        )
                                                    }
                                                    {
                                                        !link.icon && (
                                                            <div className='linkInitial'>{link.link_name[0] || ''}</div>
                                                        )
                                                    }
                                                    <div className='link' href={link.url} key={link.link_id}>{link.link_name}</div>
                                                </div>
                                            </HoverEditDelete>
                                        </div>
                                    )
                                })
                            }
                            <div className='linkBox' onClick={() => handleAddLink(category.category_id)}>
                                <div className='linkInitial'>+</div>
                                <div className='link'>添加链接</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <div className='category' onClick={() => handleAddCategory()}>
            <div className='linkInitial'>+</div>
            <div className='link'>添加分类</div>
        </div>
        <AddLink
            open={addLinkOpen}
            onCreate={handleCreateLink}
            onCancel={()=> setAddLinkOpen(false)}
        />
        <AddCategory
            open={addCategoryOpen}
            onCreate={handleCreateCategory}
            onCancel={()=> setAddCategoryOpen(false)}
        />
    </div>
};

export default SimpleHome;