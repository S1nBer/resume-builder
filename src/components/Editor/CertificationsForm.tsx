import { useResumeStore } from '../../store/resumeStore';
import Button from '../common/Button';
import Input from '../common/Input';
import FormField from '../common/FormField';

function CertificationsForm() {
  const certifications = useResumeStore((state) => state.resume.certifications);
  const addCertification = useResumeStore((state) => state.addCertification);
  const updateCertification = useResumeStore((state) => state.updateCertification);
  const removeCertification = useResumeStore((state) => state.removeCertification);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Сертификаты</h2>
        <Button type="button" onClick={() => addCertification({ name: '', issuer: '', date: '' })}>
          Добавить сертификат
        </Button>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Сертификат {index + 1}</h3>
              <Button variant="danger" type="button" onClick={() => removeCertification(cert.id)}>
                Удалить
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Название" required>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  placeholder="Название сертификата"
                />
              </FormField>

              <FormField label="Организация">
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  placeholder="Кто выдал"
                />
              </FormField>

              <FormField label="Дата получения">
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                />
              </FormField>

              <FormField label="Ссылка">
                <Input
                  type="url"
                  value={cert.url}
                  onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                  placeholder="https://example.com/cert"
                />
              </FormField>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">Нет добавленных сертификатов</p>
        )}
      </div>
    </div>
  );
}

export default CertificationsForm;
