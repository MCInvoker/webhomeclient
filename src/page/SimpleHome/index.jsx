import React, { useCallback, useEffect, useState } from 'react';

import { useRequest } from 'ahooks';
import { message } from 'antd';

import { deleteCategory } from '../../api/category';
import { addLink, deleteLink } from '../../api/link';
import { getPage } from '../../api/page';
import HoverEditDelete from '../../compenonts/HoverEditDelete';

import AddCategory from './addCategory';
import AddLink from './addLink';
import './index.css';

function SimpleHome() {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('page_id');

  const [page, setPage] = useState();
  const [category_id, setCategory_id] = useState(''); // 新增link时的分类id
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategotyInfo, setEditCategotyInfo] = useState(null);
  const [editLinkInfo, setEditLinkInfo] = useState(null);

  const getPageInfo = useCallback(() => {
    async function fetchData() {
      if (!page_id) return;
      const res = await getPage(page_id);
      setPage(res.data);
      // setCategories(res.data.categories)
    }
    fetchData();
  }, [page_id]);

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

  const handleCreateLink = async (values) => {
    // 处理新增数据的逻辑
    await addLink({ ...values }, category_id);
    getPageInfo();
  };

  // const handleDeleteLink = async (link_id) => {
  //     // 处理新增数据的逻辑
  //     const res = await deleteLink(link_id)
  //     getPageInfo()
  // };

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
    <div className="simpleHome">
      {page &&
        page.categories &&
        page.categories.map((category) => (
          <div key={category.category_id} className="category">
            <HoverEditDelete
              handleDelete={async () => deleteCategoryFn(category.category_id)}
              handleEdit={() => handleEditCategory(category)}
              top={-46}
              right={-16}
            >
              <div className="categoryName">{category.category_name}</div>
            </HoverEditDelete>
            <div className="links">
              {category.links.map((link) => (
                <div key={link.link_id}>
                  <HoverEditDelete
                    handleDelete={async () => deleteLinkFn(link.link_id)}
                    handleEdit={() => handleEditLink(link)}
                    top={-16}
                    right={-16}
                  >
                    <div className="linkBox" onClick={() => handleLink(link.url)}>
                      {link.icon && (
                        <img className="linkImg" src={link.icon} alt={link.title || ''} />
                        // <img className='linkImg' src="logo192.png" alt={link.title || ''}></img>
                      )}
                      {!link.icon && <div className="linkInitial">{link.link_name[0] || ''}</div>}
                      <div className="link" href={link.url} key={link.link_id}>
                        {link.link_name}
                      </div>
                    </div>
                  </HoverEditDelete>
                </div>
              ))}
              <div className="linkBox" onClick={() => handleAddLink(category.category_id)}>
                <div className="linkInitial">+</div>
                <div className="link">添加链接</div>
              </div>
            </div>
          </div>
        ))}
      <div className="category">
        <div
          className="linkInitial"
          style={{ cursor: 'pointer' }}
          onClick={() => handleAddCategory()}
        >
          +
        </div>
        <div className="link">添加分类</div>
      </div>
      <AddLink
        open={addLinkOpen}
        setAddOpen={setAddLinkOpen}
        category_id={category_id}
        onCreate={handleCreateLink}
        getPageInfo={getPageInfo}
        editLinkInfo={editLinkInfo}
      />

      <AddCategory
        open={addCategoryOpen}
        setAddOpen={setAddCategoryOpen}
        page_id={page_id}
        getPageInfo={getPageInfo}
        editCategotyInfo={editCategotyInfo}
      />
    </div>
  );
}

export default SimpleHome;
