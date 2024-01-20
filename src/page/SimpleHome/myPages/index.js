import { useState } from "react";
import { useRequest } from "ahooks";
import { deletePage } from "../../../api/page";
import classNames from "classnames"
import './index.css'
import { PlusOutlined } from "@ant-design/icons"
import AddPage from "../addPage";
import HoverEditDelete from "../../../compenonts/HoverEditDelete";
import { message } from 'antd';

const MyPages = (props) => {
    const { pages, setPage_id, page_id, getPagesFn } = props
    const [addPageOpen, setAddPageOpen] = useState(false)
    const [editPageInfo, setEditPageInfo] = useState(null)
    const handlePage = (page) => {
        setPage_id(page.page_id)

    }
    const handleAddPage = () => {
        setEditPageInfo(null)
        setAddPageOpen(true)
    }

    const { runAsync: deletePageFn } = useRequest(deletePage, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功!')
            getPagesFn()
        }
    });

    const handleEditPage = (page) => {
        setEditPageInfo({
            page_id: page.page_id,
            page_name: page.page_name,
            description: page.description,
        })
        setAddPageOpen(true)
    }

    return (
        <div className='pages'>
            {pages.map((page) => {
                return (
                    <HoverEditDelete
                        handleDelete={async () => deletePageFn(page.page_id)}
                        handleEdit={() => handleEditPage(page)}
                        // top={46}
                        // right={-16}
                        key={page.page_id}
                        positionStyle={{
                            top: '95%',
                            left: '50%',
                            transform: 'translate(-50%,0)'
                        }}
                    >
                        <div
                            className={classNames({
                                'page': true,
                                'active': page.page_id === page_id,
                            })}
                            onClick={() => handlePage(page)}
                        >{page.page_name}</div>
                    </HoverEditDelete>
                )
            })}
            <PlusOutlined
                className="addPage"
                onClick={() => handleAddPage()}
            />
            <AddPage
                open={addPageOpen}
                setAddOpen={setAddPageOpen}
                getPagesFn={getPagesFn}
                editPageInfo={editPageInfo}
            />
        </div>
    )
}

export default MyPages;