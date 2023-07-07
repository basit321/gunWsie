import { doc, setDoc, getDoc, getDocs, serverTimestamp, collection, addDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { db, storage } from "../Config/firebase";
import { Alert } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator"

export default function UseFirebase() {

    const getDocumentById = async (colName, documentId, setLoading) => {

        try {

            if (setLoading) setLoading(true)

            const docRef = doc(db, colName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                if (setLoading) setLoading(false)
                return {
                    status: 200,
                    data: {
                        id: documentId,
                        ...docSnap.data()
                    },
                }

            } else {

                if (setLoading) setLoading(false)
                Alert.alert("No such document!");
            }

        } catch (error) {
            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const getRtDocumentById = async (colName, documentId, setData) => {

        const unsub = onSnapshot(doc(db, colName, documentId), (doc) => {
            if (doc.exists()) {

                setData({
                    id: documentId,
                    ...doc.data()
                })
            } else {
                alert("No such document!");
            }
        });

        return unsub
    }

    const getDocuments = async (colName, setLoading, where) => {

        try {

            // //console.log(where)

            if (setLoading) setLoading(true)

            let documents = [];
            const q = query(collection(db, colName), where);

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            if (setLoading) setLoading(false)
            return {
                status: 200,
                data: documents,
            }

        } catch (error) {

            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const getRtDocuments = async (colName, setData, where) => {
        const q = query(collection(db, colName), where);

        const unsub = onSnapshot(q, (querySnapshot) => {
            let documents = [];
            querySnapshot.forEach(async (doc) => {
                documents.push({
                    id: doc.id,
                    ...doc.data(),
                })

            });

            setData(documents)
        }
        );

        return unsub

    }

    const addDocumentWithId = async (colName, documentId, body, setLoading) => {

        if (setLoading) setLoading(true)
        try {
            await setDoc(doc(db, colName, documentId), {
                ...body,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            if (setLoading) setLoading(false)
            return {
                status: 200,
                data: {
                    id: documentId,
                    ...body
                },
            }
        } catch (error) {

            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const addDocument = async (colName, body, setLoading) => {

        if (setLoading) setLoading(true)
        try {
            const docRef = await addDoc(collection(db, colName), {
                ...body,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            if (setLoading) setLoading(false)
            return {
                status: 200,
                data: {
                    id: docRef.id,
                },
            }
        } catch (error) {
            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const updateDocument = async (colName, documentId, body, setLoading) => {

        try {
            if (setLoading) setLoading(true)
            const docuRef = doc(db, colName, documentId);

            await updateDoc(docuRef, {
                ...body,
                updatedAt: serverTimestamp(),
            });

            if (setLoading) setLoading(false)
            return {
                status: 200,
                data: {
                    id: documentId,
                    ...body
                },
            }
        } catch (error) {
            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const deleteDocument = async (colName, documentId, setLoading) => {

        try {
            if (setLoading) setLoading(true)
            await deleteDoc(doc(db, colName, documentId));

            if (setLoading) setLoading(false)
            return {
                status: 200,
                data: {
                    id: documentId,
                },
            }
        } catch (error) {
            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }
    }

    const uploadImage = async (image, setLoading) => {
        try {

            if (setLoading) setLoading(true)

            const { height, width, uri } = image

            //console.log(height, width, uri)

            const result = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: width / 2.5, height: height / 2.5 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            )

            const blob = await fetch(result.uri).then((res) => res.blob())

            const storageRef = ref(storage, "/images/" + new Date().getTime())
            const snapshot = await uploadBytes(storageRef, blob)
            const url = await getDownloadURL(snapshot.ref)

            //console.log(url)

            if (setLoading) setLoading(false)

            return {
                status: 200,
                data: url,
            }
        } catch (ex) {
            if (setLoading) setLoading(false)
            Alert.alert("Error", ex.message)
            return {
                status: 400,
                error: ex.message,
            }
        }
    }

    const uploadImages = async (images, setLoading) => {
        const imagesL = []

        if (setLoading) setLoading(true)

        for (let i = 0; i < images.length; i++) {
            try {
                const { height, width, uri } = images[i]

                const result = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ resize: { width: width / 2.5, height: height / 2.5 } }],
                    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
                )

                const blob = await fetch(result.uri).then((res) => res.blob())
                const storageRef = ref(storage, "/images/" + new Date().getTime())
                const snapshot = await uploadBytes(storageRef, blob)
                const link = await getDownloadURL(snapshot.ref)
                imagesL.push(link)
            } catch (ex) {
                ex.message = "Upload Image Error: " + ex.message
                throw new Error(ex)
            }
        }

        return imagesL
    }

    const getIdDocumentRf = async (colName, documentId, setLoading, refs = []) => {

        try {

            if (setLoading) setLoading(true)

            const docRef = doc(db, colName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                const data = docSnap.data()
                const refData = {}
                for (const ref of refs) {
                    const refDoc = await getDoc(data[ref])
                    refData[ref] = {
                        id: refDoc.id,
                        ...refDoc.data()
                    }
                }

                if (setLoading) setLoading(false)

                return {
                    status: 200,
                    data: {
                        id: documentId,
                        ...data,
                        ...refData
                    },
                }

            } else {

                if (setLoading) setLoading(false)

                return {
                    status: 400,
                    error: "No such document!",
                }
            }

        } catch (error) {

            if (setLoading) setLoading(false)

            return {
                status: 400,
                error: error.message,
            }
        }

    }

    const getDocumentsRef = async (colName, setLoading, refs = [], where) => {

        try {

            if (setLoading) setLoading(true)

            let documents = [];

            const q = query(collection(db, colName), where);

            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                const data = doc.data()
                const refData = {}
                for (const ref of refs) {
                    const refDoc = await getDoc(data[ref])
                    refData[ref] = {
                        id: refDoc.id,
                        ...refDoc.data()
                    }
                }
                documents.push({
                    id: doc.id,
                    ...data,
                    ...refData
                })

            }

            if (setLoading) setLoading(false)

            return {
                status: 200,
                data: documents,
            }

        } catch (error) {

            if (setLoading) setLoading(false)
            return {
                status: 400,
                error: error.message,
            }
        }
    }

    return {
        getDocumentById,
        getRtDocumentById,
        getDocuments,
        getRtDocuments,
        addDocumentWithId,
        addDocument,
        updateDocument,
        deleteDocument,
        uploadImage,
        getIdDocumentRf,
        getDocumentsRef,
        uploadImages
    }
}