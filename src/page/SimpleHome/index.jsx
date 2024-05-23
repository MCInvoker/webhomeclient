import React, { useCallback, useEffect, useState, useMemo } from 'react';

// import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
// import classNames from 'classnames';

import { deleteCategory } from '../../api/category';
import { deleteLink } from '../../api/link';
import { getPage } from '../../api/page';
import HoverEditDelete from '../../components/HoverEditDelete';
import Icp from '../../components/Icp';

import AddCategory from './addCategory';
import AddLink from './addLink';
import Styles from './index.module.css'

function SimpleHome () {
    const params = new URLSearchParams(window.location.search);
    const page_id = params.get('page_id');

    const [page, setPage] = useState({});
    const [category_id, setCategory_id] = useState(''); // 新增link时的分类id
    const [addLinkOpen, setAddLinkOpen] = useState(false);
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);
    const [editCategotyInfo, setEditCategotyInfo] = useState(null);
    const [editLinkInfo, setEditLinkInfo] = useState(null);
    const [linksWidth, setLinksWidth] = useState('25%'); // 链接宽度
    const [linkUrlWidth, setLinkUrlWidth] = useState('140px'); // 链接地址的宽度
    const getPageInfo = useCallback(() => {
        async function fetchData () {
            if (!page_id) return;
            const res = await getPage(page_id);
            setPage(res.data);
        }
        fetchData();
    }, [page_id]);

    const categories = useMemo(() => {
        if (page.categories) {
            return page.categories.map((item) => {
                return {
                    value: item.category_id,
                    label: item.category_name,
                }
            })
        }
        return []
    }, [page])

    // 设置链接宽度，窗口大小发生改变时需要重新计算
    useEffect(() => {
        function handleResize () {
            const windowWidth = window.innerWidth; // 窗口宽度
            const minWidth = 900; // 分类/链接所占最小宽度
            const categoryWidth = Math.max(windowWidth * 0.6, minWidth) // 分类/链接所占宽度
            const linksNumber = Math.floor(categoryWidth / 255) // 每行展示的链接数量
            const newLinksWidth = `${Math.floor((100 / linksNumber) * 10000) / 10000}%`; // 链接的宽度
            const newLinkUrlWidth = `${((categoryWidth - 20 * (linksNumber - 1)) / linksNumber) - 110}px`; // 链接地址的宽度
            setLinkUrlWidth(newLinkUrlWidth)
            setLinksWidth(newLinksWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    })

    useEffect(() => {
        getPageInfo();
    }, [getPageInfo]);

    const handleLink = (url) => {
        window.open(url, '_blank');
    };

    const handleAddLink = (category_id) => {
        setCategory_id(category_id);
        setEditLinkInfo(null);
        setAddLinkOpen(true);
    };

    const handleAddCategory = () => {
        setEditCategotyInfo(null);
        setAddCategoryOpen(true);
    };

    const { runAsync: deleteLinkFn } = useRequest(deleteLink, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功!');
            getPageInfo();
        },
    });

    const handleEditLink = (link) => {
        setEditLinkInfo({
            link_id: link.link_id,
            link_name: link.link_name,
            url: link.url,
            description: link.description,
            category_id: link.category_id,
        });
        setAddLinkOpen(true);
    };

    const { runAsync: deleteCategoryFn } = useRequest(deleteCategory, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功!');
            getPageInfo();
        },
    });

    const handleEditCategory = (category) => {
        setEditCategotyInfo({
            category_id: category.category_id,
            category_name: category.category_name,
            description: category.description,
        });
        setAddCategoryOpen(true);
    };

    return (
        <div className={Styles.simpleHome}>
            <div className={Styles.simpleHomeTop}>
                <Button
                    size='large'
                    type='primary'
                    icon={
                        <i className="iconfont icon-icon-collect" />
                    }
                    style={{ marginRight: '12px' }}
                    onClick={() => handleAddLink(categories[0].value)}
                >收藏网址</Button>
                <Button
                    size='large'
                    icon={
                        <i className="iconfont icon-folder-add" />
                    }
                    onClick={() => handleAddCategory()}
                >添加分类</Button>
            </div>
            {page &&
                page.categories &&
                page.categories.map((category) => (
                    <div key={category.category_id} className={Styles.category}>
                        <HoverEditDelete
                            handleDelete={async () => deleteCategoryFn(category.category_id)}
                            handleEdit={() => handleEditCategory(category)}
                            positionStyle={{
                                right: '0%',
                                top: '50%',
                                transform: 'translate(0%, -50%)',
                                padding: '0',
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                            buttonType='default'
                            editButtonStyle={{ marginRight: '12px' }}
                        >
                            <div className={Styles.categoryName}>{category.category_name}</div>
                        </HoverEditDelete>
                        <div className={Styles.links}>
                            {category.links.map((link) => (
                                <div key={link.link_id} className={Styles.linkBox} style={{ width: linksWidth }}>
                                    <HoverEditDelete
                                        handleDelete={async () => deleteLinkFn(link.link_id)}
                                        handleEdit={() => handleEditLink(link)}
                                        positionStyle={{
                                            left: '50%',
                                            bottom: '-12px',
                                            transform: 'translate(-50%, 100%)'
                                        }}
                                    >
                                        <div className={Styles.linkItem} onClick={() => handleLink(link.url)}>
                                            <div className={Styles.linkItemLeft}>
                                                {link.icon && (
                                                    <img className={Styles.linkImg} src={link.icon} alt={link.title || ''} />
                                                )}
                                                {!link.icon && <div className={Styles.linkInitial}>{link.link_name[0] || ''}</div>}
                                            </div>
                                            <div className={Styles.linkItemRight}>
                                                <div className={Styles.linkName} style={{ width: linkUrlWidth }}>
                                                    {link.link_name}
                                                </div>
                                                <div
                                                    className={Styles.linkUrl}
                                                    style={{ width: linkUrlWidth }}
                                                    title={link.url}
                                                >
                                                    {link.url.match(/\/\/(.+)/) && (link.url.match(/\/\/(.+)/).length > 1) ? link.url.match(/\/\/(.+)/)[1] : link.url}
                                                </div>
                                            </div>
                                        </div>
                                    </HoverEditDelete>
                                </div>
                            ))}
                            {/* <div className={Styles.linkBox} onClick={() => handleAddLink(category.category_id)} style={{ width: linksWidth }}>
                                <div className={classNames([Styles.linkItem, Styles.addLink])}>
                                    <PlusOutlined style={{ height: '60px', fontSize: '40px', color: '#e1e1e4' }} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
            <Icp />
            {addLinkOpen && <AddLink
                open={addLinkOpen}
                setAddOpen={setAddLinkOpen}
                category_id={category_id}
                getPageInfo={getPageInfo}
                editLinkInfo={editLinkInfo}
                categories={categories}
                page_id={page_id}
            />}

            {addCategoryOpen && <AddCategory
                open={addCategoryOpen}
                setAddOpen={setAddCategoryOpen}
                page_id={page_id}
                getPageInfo={getPageInfo}
                editCategotyInfo={editCategotyInfo}
            />}
        </div>
    );
}

export default SimpleHome;
