import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import classNames from 'classnames'
import RChip from './RChip'
import { Database } from 'lucide-react'
import NA from './NA'

function TableSimple(props) {
  const {
    tHeaders,
    tBody,
    isAction = true,
    isStt = true,
    tCaption,
    tFooters,
  } = props

  return (
    <Table>
      {tCaption && <TableCaption>{tCaption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {isStt && (
            <TableHead className="w-[100px] max-lg:w-[80px] max-md:w-[70px] max-md:w-[100px] max-sm:w-[55px]">
              STT
            </TableHead>
          )}
          {tHeaders.map((head) => {
            return (
              <TableHead className="text-nowrap" key={head.title}>
                {head.title}
              </TableHead>
            )
          })}
          {isAction && (
            <TableHead className="text-right text-nowrap">Thao tác</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tBody.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={(isStt ? 1 : 0) + tHeaders.length + (isAction ? 1 : 0)}
              className="py-4 text-center text-gray-500 italic"
            >
              <div className="flex items-center justify-center gap-2.5">
                <Database size="18" /> Không có dữ liệu nào để hiển thị
              </div>
            </TableCell>
          </TableRow>
        ) : (
          tBody.map((row, rowIndex) => {
            const isRChipRaw = row['isRChips']

            /**
             * set: lưu giá trị
             * map: lưu key & value
             */
            const rChipMap = new Map(
              isRChipRaw?.map((item) => [item.key, item.color || '#6d64eb']) ??
                [],
            )

            const tActions = row.actions

            return (
              <TableRow
                key={rowIndex}
                className="transition-colors duration-150 hover:bg-gray-100"
              >
                {isStt && (
                  <TableCell>
                    #{String(rowIndex + 1).padStart(2, '0')}
                  </TableCell>
                )}
                {tHeaders.map((header, colIndex) => {
                  const chipColor = rChipMap.get(String(header.key))
                  const styles = {
                    minWidth: header.width,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                  }

                  return (
                    // Nếu không muốn xuống dòng
                    // className={classNames({
                    //     'text-nowrap': !header.width,
                    // })}
                    <TableCell
                      key={colIndex}
                      style={header.width ? styles : {}}
                      className={classNames({
                        '': !header.width,
                      })}
                    >
                      {chipColor ? (
                        <RChip bgColor={chipColor}>
                          {row[header.key] ? row[header.key] : <NA />}
                        </RChip>
                      ) : row[header.key] ? (
                        row[header.key]
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                  )
                })}
                {tActions && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      {tActions.map((action) => {
                        return (
                          <action.icon
                            size={action.size ?? 19}
                            className={classNames('cursor-pointer', {
                              'text-red-500':
                                action.value.split('_')[0] === 'delete',
                              'text-indigo-500':
                                action.value.split('_')[0] === 'duplicate',
                              'text-orange-500':
                                action.value.split('_')[0] === 'create',
                              'text-[#3D74B6]':
                                action.value.split('_')[0] === 'view' ||
                                action.value.split('_')[0] === 'read',
                              'text-[#28ac75]':
                                action.value.split('_')[0] === 'any' ||
                                action.value.split('_')[0] === 'edit',
                            })}
                            key={action.value}
                            onClick={() => action.fn(row)}
                          />
                        )
                      })}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )
          })
        )}
      </TableBody>
      <TableFooter>
        {tFooters &&
          tFooters.map((footerRow, index) => {
            return (
              <TableRow key={index}>
                <TableCell
                  className={footerRow.className}
                  colSpan={footerRow.colSpan}
                >
                  {footerRow.title}
                </TableCell>
                <TableCell>{footerRow.content}</TableCell>
              </TableRow>
            )
          })}
        <TableRow>
          <TableCell colSpan={2}>Tổng cộng:</TableCell>
          <TableCell className="whitespace-nowrap">
            {tBody.length} hàng dữ liệu
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
export default TableSimple
