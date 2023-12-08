import { useEffect, useState } from "react";
import './index.css'
import { mockLinkAll } from './mock'
import AddLink from "./addLink";
import HoverEditDelete from "../../compenonts/HoverEditDelete";
import { addLink, deleteLink } from '../../api/link'
import { getPage } from "../../api/page";

const SimpleHome = () => {
    const page_id = 1

    // const [linkAll, setLinkAll] = useState(mockLinkAll)
    const [categories, setCategories] = useState([])
    const [seletedCategoryIndex, setSeletedCategoryIndex] = useState('')
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const handleLink = (url) => {
        window.open(url, '_blank');
    }

    const handleAddLink = (categoryIndex) => {
        setSeletedCategoryIndex(categoryIndex)
        setAddLinkOpen(true)
        console.log(123)
    }

    const handleCreate = async (values) => {
        console.log('handleCreate', values);
        // 处理新增数据的逻辑
        const res = await addLink({ ...values, category_id: '1' })
        console.log(res)
        // console.log('Received values:', values);
        // // 在这里触发你的新增数据的请求等操作
        // setAddLinkOpen(false);
    };

    const handleDelete = async (values) => {
        console.log('handleCreate', values);
        // 处理新增数据的逻辑
        const res = await deleteLink(3)
        console.log(res)
        // console.log('Received values:', values);
        // // 在这里触发你的新增数据的请求等操作
        // setAddLinkOpen(false);
    };


    useEffect(() => {
        async function fetchData () {
            const res = await getPage(1);
            console.log(res)
            setCategories(res.data.categories)
        }
        fetchData();
    }, []);

    const handleCancel = () => {
        setAddLinkOpen(false);
    };
    return <div className='simpleHome'>
        {
            categories.map((category) => {
                return (
                    <div key={category.category_id} className='category'>
                        <div className='categoryName'>{category.category_name}</div>
                        <div className='links'>
                            {
                                category.links.map((link) => {
                                    return (
                                        <div key={link.linkId}>
                                            <HoverEditDelete
                                                handleDelete={() => handleDelete()}
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
                                <div className='link'>添加</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <AddLink
            open={addLinkOpen}
            onCreate={handleCreate}
            onCancel={handleCancel}
        />
    </div>
};

export default SimpleHome;