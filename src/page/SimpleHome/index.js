import { useEffect, useState } from "react";
import './index.css'
import { mockLinkAll } from './mock'
import AddLink from "./addLink";
import HoverEditDelete from "../../compenonts/HoverEditDelete";
import { addLink, getConfig } from '../../api/link'


const SimpleHome = () => {

    const [linkAll, setLinkAll] = useState(mockLinkAll)
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
        const res = await addLink(values)
        console.log(res)
        console.log('Received values:', values);
        // 在这里触发你的新增数据的请求等操作
        setAddLinkOpen(false);
    };


    useEffect(() => {
        async function fetchData () {
            const res = await getConfig();
            console.log(res)
        }
        fetchData();
    }, []);

    const handleCancel = () => {
        setAddLinkOpen(false);
    };
    return <div className='simpleHome'>
        {
            linkAll.map((category, categoryIndex) => {
                return (
                    <div key={category.categoryId} className='category'>
                        <div className='categoryName'>{category.categoryName}</div>
                        <div className='links'>
                            {
                                category.links.map((link, linkIndex) => {
                                    return (
                                        <div key={link.linkId}>
                                            <HoverEditDelete
                                                handleDelete={() => console.log('handleDelete')}
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
                                                            <div className='linkInitial'>{link.title[0] || ''}</div>
                                                        )
                                                    }
                                                    <div className='link' href={link.url} key={link.linkId}>{link.title}</div>
                                                </div>
                                            </HoverEditDelete>
                                        </div>
                                    )
                                })
                            }
                            <div className='linkBox' onClick={() => handleAddLink(categoryIndex)}>
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