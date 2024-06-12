import path from 'path'
import * as uuid from 'uuid'

class FileService {
	saveFile(file) {
		try {
			const fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve('src/static', fileName)
			file.mv(filePath)
			return fileName
		} catch (e) {
			console.log(e)
		}
	}
}

export default new FileService()
