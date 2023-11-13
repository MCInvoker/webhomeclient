import { useState } from "react";
import './index.css'

const mockLinkAll = [
    {
        categoryName: '常用地址',
        categoryId: '1',
        links: [
            {
                url:'https://x.chat838.com/',
                title: '百度',
                icon: '',
                linkId: '1'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '2'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '3'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '4'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '5'
            },
        ]
    },
    {
        categoryName: 'zhibo',
        categoryId: '2',
        links: [
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '1'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '2'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '3'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '4'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '5'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '6'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '7'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '8'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '9'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '10'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '11'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '12'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '13'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '14'
            },
            {
                url:'https://x.chat838.com/',
                title: 'chat',
                icon: '',
                linkId: '15'
            },
        ]
    },
]

const SimpleHome = () => {

    const [linkAll, setLinkAll] = useState(mockLinkAll)
    const [seletedCategoryIndex, setSeletedCategoryIndex] = useState('')

    const handleLink = (url) => {
        window.open(url, '_blank');
    }
    const handleAddLink = (categoryIndex)=>{
        setSeletedCategoryIndex(categoryIndex)
    }
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
                                        <div className='linkBox' onClick={() => handleLink(link.url)}>
                                            {
                                                link.icon && (
                                                    <img className='linkImg' src={link.icon}></img>
                                                )
                                            }
                                            {
                                                !link.icon && (
                                                    <div className='linkInitial'>{link.title[0] || ''}</div>
                                                )
                                            }
                                            <div  className='link' href={link.url} key={link.linkId}>{link.title}</div>
                                        </div>
                                    )
                                })
                            }
                            <div className='linkBox' onClick={() => handleAddLink(categoryIndex)}>
                                <div className='linkInitial'>+</div>
                                <div  className='link'>添加</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
};

export default SimpleHome;