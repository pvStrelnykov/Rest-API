import path from 'path'
import * as uuid from 'uuid'

class FileService {
	saveFile(file) {
		try {
			const fileName = uuid.v4() + '.png'
			const filePath = path.resolve('client/src/img', fileName)
			file.mv(filePath)
			return fileName
		} catch (e) {
			console.log(e)
		}
	}
}

export default new FileService()
